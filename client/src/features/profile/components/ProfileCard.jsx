import ProfileHeader from "./ProfileHeader";
import AddressCard from "./AddressCard";
import LocationCard from "./LocationCard";
import UpgradeCard from "./UpgradeCard";

export default function ProfileCard(props) {
  const { user } = props;

  return (
    <div className="relative">
      <div className="absolute inset-0 -rotate-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10" />

      <div className="relative rounded-3xl p-10 bg-slate-950/70 border border-white/10">
        <ProfileHeader {...props} />

        <div className="my-8 h-px bg-white/10" />

        <div className="grid gap-6">
          <AddressCard {...props} />
          <LocationCard
            user={user}
            showMap={props.showMap}
            setShowMap={props.setShowMap}
            saveLocation={props.saveLocation}
            saving={props.saving}
          />
        </div>

        {user.currentPlan === "free" && <UpgradeCard />}
      </div>
    </div>
  );
}
