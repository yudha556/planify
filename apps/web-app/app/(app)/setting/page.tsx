import ProfileCard from "./components/profileCard";
import AppPreference from "./components/appPreference";
import Notification from "./components/notification";
import DangerZone from "./components/dangerZone";

export default function Setting() {

  return (
    <div className="flex flex-col gap-8 w-full px-20 py-10">
        <ProfileCard />
        <AppPreference />
        <Notification />
        <DangerZone />
      </div>
  );
}
