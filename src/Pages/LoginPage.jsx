import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

const LoginPage = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="grid grid-cols-1 w-auto md:grid-cols-2 bg-black">
          <div>
            <img src="/src/images/login.webp" alt=""  />
          </div>
          <Card className="bg-none rounded-lg">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Please enter your details</CardDescription>
            </CardHeader>
            <CardContent>
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="Email" />
              <label htmlFor="password">Password</label>
              <Input id="password" type="password" placeholder="Password" />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="hover:bg-blue-600 hover:text-white">Login</Button>
              <p className="flex px-2 gap-2 text-sm text-gray-500">Dont have an account? 
                <a href="#" className="text-black hover:text-blue-600">Create new</a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
