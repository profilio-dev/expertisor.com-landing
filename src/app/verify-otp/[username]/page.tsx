"use client"; // Client component
import VerifyOtpClient from "@/components/ui/landing_page/verifyOtpComponent";
import { useParams } from "next/navigation";

export default function Page() {
  const { username } = useParams() as { username: string }; // get username from URL
  return <VerifyOtpClient username={username} />;
}