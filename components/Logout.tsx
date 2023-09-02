import { Button } from "./ui/button";

export default function Logout() {
  return (
    <form action="/auth/sign-out" method="post">
       Logout 
    </form>
  );
}
