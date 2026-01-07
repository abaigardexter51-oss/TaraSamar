import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, Search, MapPin, Building2, Map, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { searchItems, type SearchResult } from "@/lib/searchData";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Businesses", path: "/businesses" },
  { name: "Rates", path: "/bookings" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const ADMIN_EMAIL = "TaraSamar@gmail.com";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load current user and keep navbar in sync with auth changes
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      const email = data.user?.email ?? null;
      setUserEmail(email);
      setIsAdmin(email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
      if (email) {
        void loadNotifications(email);
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    };

    void loadUser();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user.email ?? null;
      setUserEmail(email);
      setIsAdmin(email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
      if (email) {
        void loadNotifications(email);
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const loadNotifications = async (email: string) => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to load notifications", error);
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setNotifications(data ?? []);
    setUnreadCount((data ?? []).filter((n) => !n.read_at).length);
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchItems(searchQuery);
      setSearchResults(results);
      setShowSearchDropdown(results.length > 0);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSelect = (result: SearchResult) => {
    setSearchQuery("");
    setShowSearchDropdown(false);
    navigate(result.path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchSelect(searchResults[0]);
    }
  };

  const handleSignOut = async () => {
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
      description: "You have been signed out.",
    });
    setIsOpen(false);
    setNotifications([]);
    setUnreadCount(0);
    navigate("/");
  };

  const handleMarkNotificationRead = async (id: string) => {
    const existing = notifications.find((n) => n.id === id);
    if (!existing || existing.read_at) return;

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    const { error } = await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to mark notification as read", error);
    }
  };

  const getResultIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "destination":
        return <Map className="w-4 h-4" />;
      case "resort":
        return <Building2 className="w-4 h-4" />;
      case "business":
        return <Building2 className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const isHome = location.pathname === "/";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled || !isHome
          ? "bg-card/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean to-ocean-light flex items-center justify-center">
            <span className="text-cream font-display font-bold text-lg">TS</span>
          </div>
          <span
            className={cn(
              "font-display text-xl font-bold transition-colors duration-300",
              scrolled || !isHome ? "text-foreground" : "text-cream"
            )}
          >
            TaraSamar
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors duration-300 hover:text-accent relative group",
                scrolled || !isHome ? "text-foreground" : "text-cream",
                location.pathname === link.path && "text-accent"
              )}
            >
              {link.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300",
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Search with Autocomplete */}
          <div ref={searchRef} className="relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search destinations, resorts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() && searchResults.length > 0 && setShowSearchDropdown(true)}
                  className={cn(
                    "w-64 pl-10 pr-4 h-9 text-sm transition-all",
                    scrolled || !isHome 
                      ? "bg-background border-input text-foreground" 
                      : "bg-cream/10 border-cream/20 text-cream placeholder:text-cream/50 backdrop-blur-sm"
                  )}
                />
                <Search className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none",
                  scrolled || !isHome ? "text-muted-foreground" : "text-cream/70"
                )} />
              </div>
            </form>

            {/* Search Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-medium z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  {searchResults.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleSearchSelect(result)}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary transition-colors flex items-start gap-3 group"
                    >
                      <div className={cn(
                        "mt-0.5 shrink-0",
                        result.type === "destination" ? "text-ocean" :
                        result.type === "resort" ? "text-coral" : "text-sunset"
                      )}>
                        {getResultIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground group-hover:text-ocean transition-colors truncate">
                          {result.name}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {result.location}
                        </div>
                        {result.category && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {result.category}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {userEmail ? (
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant={scrolled || !isHome ? "ghost" : "glass"}
                  size="icon"
                  className="rounded-full relative"
                  onClick={() => setShowNotifications((prev) => !prev)}
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 rounded-full bg-sunset text-[10px] font-medium text-cream flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-medium z-50 overflow-hidden">
                    <div className="px-3 py-2 border-b border-border flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Notifications
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {unreadCount} unread
                      </span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="px-3 py-4 text-xs text-muted-foreground">
                          No notifications yet. You will see booking updates here.
                        </p>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            type="button"
                            onClick={() => handleMarkNotificationRead(n.id)}
                            className={cn(
                              "w-full text-left px-3 py-2 border-b border-border/60 last:border-b-0 text-xs",
                              !n.read_at ? "bg-ocean/5 hover:bg-ocean/10" : "hover:bg-muted",
                            )}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-medium text-foreground text-[11px]">
                                {n.title}
                              </span>
                              <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                {new Date(n.created_at).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground line-clamp-2">
                              {n.message}
                            </p>
                            {!n.read_at && (
                              <span className="mt-1 inline-block text-[10px] text-ocean font-medium">
                                Tap to mark as read
                              </span>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {isAdmin && (
                <Button
                  variant={scrolled || !isHome ? "outline" : "glass"}
                  size="sm"
                  asChild
                >
                  <Link to="/admin">
                    <User className="h-4 w-4 mr-1" />
                    Admin
                  </Link>
                </Button>
              )}
              <Button
                variant={scrolled || !isHome ? "ocean" : "glass"}
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              variant={scrolled || !isHome ? "ocean" : "glass"}
              size="sm"
              asChild
            >
              <Link to="/signin">
                <User className="h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant={scrolled || !isHome ? "ghost" : "glass"}
          size="icon"
          className="lg:hidden rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-card/98 backdrop-blur-lg shadow-medium transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === link.path
                  ? "bg-ocean/10 text-ocean"
                  : "hover:bg-muted"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Search */}
          <div className="px-4 py-2 border-t border-border">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search destinations, resorts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && searchResults.length > 0 && setShowSearchDropdown(true)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {/* Mobile Search Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="mt-2 bg-card border border-border rounded-lg shadow-medium max-h-64 overflow-y-auto">
                <div className="p-2">
                  {searchResults.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => {
                        handleSearchSelect(result);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary transition-colors flex items-start gap-3"
                    >
                      <div className={cn(
                        "mt-0.5 shrink-0",
                        result.type === "destination" ? "text-ocean" :
                        result.type === "resort" ? "text-coral" : "text-sunset"
                      )}>
                        {getResultIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground truncate">
                          {result.name}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {result.location}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
            {userEmail ? (
              <>
                {isAdmin && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4 mr-1" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button
                  variant="ocean"
                  className="flex-1"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="ocean" className="flex-1" asChild>
                <Link to="/signin" onClick={() => setIsOpen(false)}>
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
