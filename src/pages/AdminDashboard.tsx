import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, Activity, ShieldCheck, Filter, Clock, LogOut, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";

const ADMIN_EMAIL = "TaraSamar@gmail.com";

type ActivityLog = {
  id: string;
  user_id: string | null;
  email: string | null;
  event_type: string;
  description: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

type BookingRequest = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  message: string | null;
  package_name: string | null;
  guests: number | null;
  selected_date: string | null;
  status: string;
  created_at: string;
};

const eventTypeLabels: Record<string, string> = {
  signin: "Sign In",
  signup: "Sign Up",
  booking_request: "Booking Request",
};

const eventTypeColors: Record<string, string> = {
  signin: "bg-emerald-100 text-emerald-800",
  signup: "bg-sky-100 text-sky-800",
  booking_request: "bg-amber-100 text-amber-800",
};

const AdminDashboard = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      const email = data.user?.email ?? null;
      setIsAdmin(email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
      setIsCheckingAuth(false);
    };

    void checkAdmin();
  }, []);

  const [eventFilter, setEventFilter] = useState<string>("all");

  const { data: logs = [], isLoading, refetch } = useQuery<ActivityLog[]>({
    queryKey: ["activity_logs", eventFilter],
    enabled: isAdmin,
    queryFn: async () => {
      let query = supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (eventFilter !== "all") {
        query = query.eq("event_type", eventFilter);
      }

      const { data, error } = await query;
      if (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch activity logs", error);
        return [];
      }
      return data ?? [];
    },
  });

  const stats = {
    total: logs.length,
    signins: logs.filter((l) => l.event_type === "signin").length,
    signups: logs.filter((l) => l.event_type === "signup").length,
    bookings: logs.filter((l) => l.event_type === "booking_request").length,
  };

  const renderEventBadge = (type: string) => {
    const label = eventTypeLabels[type] ?? type;
    const color = eventTypeColors[type] ?? "bg-slate-100 text-slate-800";
    return <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${color}`}>{label}</span>;
  };

  // Booking requests list
  const { data: bookings = [] } = useQuery<BookingRequest[]>({
    queryKey: ["booking_requests"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("booking_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch booking requests", error);
        return [];
      }
      return data ?? [];
    },
  });

  const confirmMutation = useMutation({
    mutationFn: async (booking: BookingRequest) => {
      const { error } = await supabase
        .from("booking_requests")
        .update({ status: "confirmed", updated_at: new Date().toISOString() })
        .eq("id", booking.id);

      if (error) throw error;

      // Log confirmation event
      const { error: logError } = await supabase.from("activity_logs").insert({
        user_id: null,
        email: booking.email,
        event_type: "booking_confirmed",
        description: `Admin confirmed booking for ${booking.package_name ?? "a package"}.`,
        metadata: {
          booking_id: booking.id,
          package_name: booking.package_name,
          guests: booking.guests,
          selected_date: booking.selected_date,
        },
      });

      if (logError) {
        // eslint-disable-next-line no-console
        console.error("Failed to log booking confirmation", logError);
      }

      // Create a notification record for the guest
      const { error: notificationError } = await supabase.from("notifications").insert({
        email: booking.email,
        type: "booking_confirmed",
        title: "Your booking has been confirmed",
        message:
          `Your booking request for ${booking.package_name ?? "a package"} has been confirmed. ` +
          "The resort will contact you soon to finalize the details.",
        data: {
          booking_id: booking.id,
          package_name: booking.package_name,
          guests: booking.guests,
          selected_date: booking.selected_date,
        },
      });

      if (notificationError) {
        // eslint-disable-next-line no-console
        console.error("Failed to create notification", notificationError);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["booking_requests"] });
      void queryClient.invalidateQueries({ queryKey: ["activity_logs"] });
      toast({
        title: "Booking confirmed",
        description: "The guest has been marked as confirmed. Please contact them via email or phone.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Unable to confirm booking",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isCheckingAuth) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Checking admin access…</p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <section className="flex-1 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="font-display text-2xl font-bold text-center">Access Restricted</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <ShieldCheck className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="text-muted-foreground text-sm">
                This page is only available to the admin account <span className="font-medium">{ADMIN_EMAIL}</span>.
              </p>
              <p className="text-muted-foreground text-xs">
                Please sign in with the admin email and password to view user activity logs.
              </p>
            </CardContent>
          </Card>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="pt-28 pb-8 bg-gradient-to-br from-navy via-ocean to-ocean-light text-cream">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8" />
              Admin Dashboard
            </h1>
            <p className="mt-2 text-cream/80 text-sm md:text-base max-w-2xl">
              Monitor user activity across the TaraSamar website, including sign-ins, sign-ups, and booking requests.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-cream/80">
              <Activity className="w-5 h-5" />
              <span>Real-time activity logs via Supabase</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-cream/40 text-cream hover:bg-cream/10"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) {
                  toast({
                    title: "Unable to sign out",
                    description: error.message,
                    variant: "destructive",
                  });
                  return;
                }
                toast({
                  title: "Signed out",
                  description: "You have been signed out of the admin account.",
                });
                navigate("/");
              }}
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Total Logged Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-2xl font-bold">{stats.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Sign Ins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-2xl font-bold">{stats.signins}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Sign Ups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-2xl font-bold">{stats.signups}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Booking Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-2xl font-bold">{stats.bookings}</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters + actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Showing latest {logs.length} events</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={eventFilter}
                  onChange={(e) => setEventFilter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 text-xs md:text-sm"
                >
                  <option value="all">All events</option>
                  <option value="signin">Sign ins</option>
                  <option value="signup">Sign ups</option>
                  <option value="booking_request">Booking requests</option>
                </select>
              </div>
              <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
                Refresh
              </Button>
            </div>
          </div>

          {/* Activity table */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-ocean" />
                User Activity Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading logs…</p>
              ) : logs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No activity has been logged yet.</p>
              ) : (
                <div className="rounded-md border border-border bg-card/60">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[140px]">When</TableHead>
                        <TableHead className="w-[140px]">Event</TableHead>
                        <TableHead>User / Email</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-[140px] text-right">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(log.created_at).toLocaleString()}
                          </TableCell>
                          <TableCell>{renderEventBadge(log.event_type)}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-medium">
                                {log.email ?? "Unknown user"}
                              </span>
                              {log.user_id && (
                                <span className="text-[10px] text-muted-foreground">
                                  User ID: {log.user_id}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {log.description ?? "-"}
                          </TableCell>
                          <TableCell className="text-right text-xs">
                            {log.metadata && Object.keys(log.metadata).length > 0 ? (
                              <Badge variant="outline" className="font-normal">
                                View in Supabase
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground/70">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking requests table */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Booking Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">No booking requests yet.</p>
              ) : (
                <div className="rounded-md border border-border bg-card/60 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[160px]">Submitted</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Package</TableHead>
                        <TableHead>Guests / Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[140px] text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(booking.created_at).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-medium">{booking.full_name}</span>
                              <span className="text-xs text-muted-foreground">{booking.email}</span>
                              <span className="text-xs text-muted-foreground">{booking.phone}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {booking.package_name ?? "N/A"}
                            {booking.message && (
                              <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                                {booking.message}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-sm">
                            <div>{booking.guests ?? "-"} guests</div>
                            <div className="text-xs text-muted-foreground">
                              {booking.selected_date
                                ? new Date(booking.selected_date).toLocaleDateString()
                                : "No date set"}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            <Badge
                              variant={booking.status === "confirmed" ? "outline" : "secondary"}
                              className={
                                booking.status === "confirmed"
                                  ? "border-emerald-500 text-emerald-700"
                                  : "bg-amber-100 text-amber-800"
                              }
                            >
                              {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {booking.status === "pending" ? (
                              <Button
                                size="sm"
                                disabled={confirmMutation.isPending}
                                onClick={() => confirmMutation.mutate(booking)}
                              >
                                Confirm
                              </Button>
                            ) : (
                              <span className="text-xs text-muted-foreground">Already confirmed</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AdminDashboard;


