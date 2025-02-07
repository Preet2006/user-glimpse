
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface UserResponse {
  results: Array<{
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
    phone: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    location: {
      city: string;
      country: string;
    };
  }>;
}

const fetchUser = async (): Promise<UserResponse> => {
  const response = await fetch("https://randomuser.me/api/?page=1&results=1&seed=abc");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load user data. Please try again.",
      variant: "destructive",
    });
  }

  const user = data?.results[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div
        className={cn(
          "w-full max-w-md transform transition-all duration-500",
          "hover:scale-[1.02]",
          isLoading || !user ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="relative backdrop-blur-sm bg-white/80 rounded-2xl p-8 shadow-lg border border-gray-100">
          {isLoading || !user ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          ) : (
            <>
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-24 h-24 rounded-full object-cover ring-2 ring-white"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-white/30 pointer-events-none" />
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 mb-2">
                    Profile
                  </div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {user.name.first} {user.name.last}
                  </h1>
                  <p className="text-gray-500 mt-1 capitalize">{user.gender}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {user.location.city}, {user.location.country}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
