import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile } from '../types/profile';

interface ProfilesContextType {
  profiles: Profile[];
  addProfile: (profile: Profile) => void;
  updateProfile: (id: string, updatedProfile: Profile) => void;
  deleteProfile: (id: string) => void;
  getProfileById: (id: string) => Profile | undefined;
  selectedProfiles: string[];
  toggleProfileSelection: (id: string) => void;
  clearSelectedProfiles: () => void;
}

const ProfilesContext = createContext<ProfilesContextType>({
  profiles: [],
  addProfile: () => {},
  updateProfile: () => {},
  deleteProfile: () => {},
  getProfileById: () => undefined,
  selectedProfiles: [],
  toggleProfileSelection: () => {},
  clearSelectedProfiles: () => {},
});

export const useProfiles = () => useContext(ProfilesContext);

interface ProfilesProviderProps {
  children: ReactNode;
}

export const ProfilesProvider: React.FC<ProfilesProviderProps> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const savedProfiles = localStorage.getItem('profiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  });

  const [selectedProfiles, setSelectedProfiles] = useState<string[]>(() => {
    const savedSelection = localStorage.getItem('selectedProfiles');
    return savedSelection ? JSON.parse(savedSelection) : [];
  });

  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('selectedProfiles', JSON.stringify(selectedProfiles));
  }, [selectedProfiles]);

  const addProfile = (profile: Profile) => {
    setProfiles((prevProfiles) => [...prevProfiles, profile]);
  };

  const updateProfile = (id: string, updatedProfile: Profile) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) => (profile.id === id ? updatedProfile : profile))
    );
  };

  const deleteProfile = (id: string) => {
    setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));
    setSelectedProfiles((prevSelected) => prevSelected.filter((profileId) => profileId !== id));
  };

  const getProfileById = (id: string) => {
    return profiles.find((profile) => profile.id === id);
  };

  const toggleProfileSelection = (id: string) => {
    setSelectedProfiles((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((profileId) => profileId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const clearSelectedProfiles = () => {
    setSelectedProfiles([]);
  };

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        addProfile,
        updateProfile,
        deleteProfile,
        getProfileById,
        selectedProfiles,
        toggleProfileSelection,
        clearSelectedProfiles,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};