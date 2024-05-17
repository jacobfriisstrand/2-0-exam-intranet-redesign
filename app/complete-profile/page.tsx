import AKQALogo from "@/components/Logo/AKQALogo";
import AnchorLogo from "@/components/Logo/AnchorLogo";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CompleteProfileForm from "./CompleteProfileForm"; // Import the client component
import { cookies } from "next/headers";

export default function CompleteProfile({
  searchParams,
}: {
  searchParams: { email: string; message: string };
}) {
  const cookieStore = cookies();
  const emailCookie = cookieStore.get("user_email");
  const email = emailCookie?.value || "";

  const completeUserProfile = async (formData: FormData) => {
    "use server";

    const fullName = formData.get("full_name") as string;
    const birthday = formData.get("birthday") as string;
    const studio_location = formData.get("studio_location") as string;
    const current_position = formData.get("current_position") as string;
    const avatarFile = formData.get("avatar_url") as File;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const skills = formData.get("skills") as string;

    const supabase = createClient();

    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (!userData?.user) {
      return redirect("/?message=User not authenticated");
    }

    const userId = userData.user.id;

    // Retrieve the current avatar URL from the profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching profile data:", profileError);
      return redirect("/complete-profile?message=Could not fetch profile data");
    }

    let avatarUrl = profileData?.avatar_url;

    // Delete the old avatar file if it exists
    if (avatarUrl) {
      const { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove([avatarUrl]);

      if (deleteError) {
        console.error("Error deleting old avatar file:", deleteError);
        return redirect(
          "/complete-profile?message=Could not delete old avatar",
        );
      }
    }

    // Upload the new avatar file to Supabase storage
    if (avatarFile) {
      const filePath = `${avatarFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        return redirect("/complete-profile?message=Could not upload avatar");
      }

      avatarUrl = filePath;
    }

    // Update the profile with the new avatar URL
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        birthday,
        studio_location: studio_location,
        current_position: current_position,
        avatar_url: avatarUrl,
        email: email,
        phone: phone,
        skills: skills,
      })
      .eq("id", userId);

    if (error) {
      return redirect("/complete-profile?message=Could not update profile");
    }

    return redirect("/protected");
  };

  return (
    <div className="container min-h-screen  max-w-screen-lg py-5">
      <section className="space-y-5">
        <div className="flex place-items-center justify-between">
          <AKQALogo className="w-20" />
          <AnchorLogo className="w-10" />
        </div>
        <div className="space-y-4">
          <h1 className="font-heading text-step2 lg:text-step5">
            Complete your profile
          </h1>
          <p className="text-lightGray">
            You must fill out your details before continuing.
          </p>
        </div>
        <CompleteProfileForm
          completeUserProfile={completeUserProfile}
          email={email}
          message={searchParams.message}
        />
      </section>
    </div>
  );
}
