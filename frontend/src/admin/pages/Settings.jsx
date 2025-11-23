import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Clock, UserPlus, Lock } from "lucide-react";
import { api } from "../../services/api";

export default function Settings() {
  const [manualTimerEnabled, setManualTimerEnabled] = useState(false);
  const [manualDate, setManualDate] = useState("");
  const [loading, setLoading] = useState(false);

  // User Management States
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const timerData = await api.getTimer();
        if (timerData && timerData.timer_time) {
          const date = new Date(timerData.timer_time);
          // Check if date is valid and in future (optional logic, but good for UI state)
          if (!isNaN(date.getTime())) {
            // Format for datetime-local input: YYYY-MM-DDTHH:mm
            const localIso = new Date(
              date.getTime() - date.getTimezoneOffset() * 60000
            )
              .toISOString()
              .slice(0, 16);
            setManualDate(localIso);
            setManualTimerEnabled(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);

      // Prepare payload
      // If disabled, we send empty string to clear it (backend expects string)
      const payload = {
        timer_time: manualTimerEnabled && manualDate ? manualDate : "",
      };

      await api.updateTimer(payload);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      setUserLoading(true);
      const token = localStorage.getItem("token");
      await api.registerUser(newUser, token);
      alert("New admin user created successfully!");
      setNewUser({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Failed to create user: " + error.message);
    } finally {
      setUserLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert("New passwords do not match!");
      return;
    }
    try {
      setUserLoading(true);
      const token = localStorage.getItem("token");
      await api.changePassword(
        {
          current_password: passwordData.current_password,
          new_password: passwordData.new_password,
        },
        token
      );
      alert("Password changed successfully!");
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.error("Failed to change password:", error);
      alert("Failed to change password: " + error.message);
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Settings</h1>
          <p className="text-sm text-white/60">
            General configuration & User Management
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#ffd700] text-black flex gap-2"
        >
          <Save size={16} /> {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-[#08162e] border border-white/10 rounded-lg p-6 space-y-6">
          <h3 className="text-lg font-bold border-b border-white/10 pb-2">
            General Info
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tournament Name</label>
            <Input
              defaultValue="Surjit Hockey Tournament"
              className="bg-[#0f1e3a] border-white/10 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Current Edition</label>
            <Input
              defaultValue="41st"
              className="bg-[#0f1e3a] border-white/10 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Contact Email</label>
            <Input
              defaultValue="info@surjithockey.in"
              className="bg-[#0f1e3a] border-white/10 text-white"
            />
          </div>
        </div>

        {/* Timer Settings */}
        <div className="bg-[#08162e] border border-white/10 rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <Clock className="text-[#ffd700]" size={20} />
            <h3 className="text-lg font-bold">Home Page Timer</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-[#0f1e3a] rounded-md border border-white/5">
              <Checkbox
                id="manualTimer"
                checked={manualTimerEnabled}
                onCheckedChange={setManualTimerEnabled}
                className="mt-1 border-white/30 data-[state=checked]:bg-[#ffd700] data-[state=checked]:text-black"
              />
              <div className="space-y-1">
                <label
                  htmlFor="manualTimer"
                  className="text-sm font-medium cursor-pointer"
                >
                  Enable Manual Override
                </label>
                <p className="text-xs text-white/50">
                  If unchecked, the timer will automatically count down to the{" "}
                  <strong>Next Scheduled Match</strong> found in Fixtures.
                </p>
              </div>
            </div>

            {manualTimerEnabled && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-sm font-medium">
                  Target Date & Time
                </label>
                <Input
                  type="datetime-local"
                  value={manualDate}
                  onChange={(e) => setManualDate(e.target.value)}
                  className="bg-[#0f1e3a] border-white/10 text-white scheme-dark"
                />
                <p className="text-xs text-white/40">
                  The timer on the home page will count down to this specific
                  moment.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Create New Admin */}
        <div className="bg-[#08162e] border border-white/10 rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <UserPlus className="text-[#ffd700]" size={20} />
            <h3 className="text-lg font-bold">Create New Admin</h3>
          </div>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                className="bg-[#0f1e3a] border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="bg-[#0f1e3a] border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="bg-[#0f1e3a] border-white/10 text-white"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={userLoading}
              className="w-full bg-[#ffd700] text-black hover:bg-[#e6c200]"
            >
              {userLoading ? "Creating..." : "Create Admin User"}
            </Button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-[#08162e] border border-white/10 rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <Lock className="text-[#ffd700]" size={20} />
            <h3 className="text-lg font-bold">Change Password</h3>
          </div>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <Input
                type="password"
                value={passwordData.current_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    current_password: e.target.value,
                  })
                }
                className="bg-[#0f1e3a] border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <Input
                type="password"
                value={passwordData.new_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    new_password: e.target.value,
                  })
                }
                className="bg-[#0f1e3a] border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Confirm New Password
              </label>
              <Input
                type="password"
                value={passwordData.confirm_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirm_password: e.target.value,
                  })
                }
                className="bg-[#0f1e3a] border-white/10 text-white"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={userLoading}
              className="w-full bg-[#ffd700] text-black hover:bg-[#e6c200]"
            >
              {userLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
