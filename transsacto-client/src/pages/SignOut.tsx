
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignOut() {
  const handleSignOut = () => {
    console.log("User signed out");
    // Backend logic would handle the actual sign out
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-100">Sign Out</CardTitle>
          <CardDescription className="text-slate-400">Are you sure you want to sign out?</CardDescription>
        </CardHeader>
        
        <CardFooter className="flex justify-center">
          <Button 
            onClick={handleSignOut} 
            variant="destructive" 
            className="w-full hover:bg-red-600 transition-colors"
          >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
