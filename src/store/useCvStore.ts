import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  type UserData,
  type PersonalInfo,
  type Skill,
  type Experience,
  type Education,
  type OtherSection,
} from "@/types/userInfoTypes";

const STORAGE_KEY = "cv-in-mins-data";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

interface Cvstore {
  cvData: UserData;
  _lastUpdated: number;

  setPersonalInfo: (e: PersonalInfo) => void;
  upDatePersonalInfo: (e: Partial<PersonalInfo>) => void;

  setExperience: (e: Experience) => void;
  setSkill: (e: Skill) => void;
  setEducation: (e: Education) => void;
  setOthers: (e: OtherSection) => void;

  updateExperience: (id: string, data: Partial<Experience>) => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  updateOtherSection: (id: string, data: Partial<OtherSection>) => void;

  removeExperience: (id: string) => void;
  removeSkill: (id: string) => void;
  removeEducation: (id: string) => void;
  removeOtherSection: (id: string) => void;

  clearData: () => void;
}

const initialUser: UserData = {
  personal: {
    name: "",
    address: "",
    phone: "",
    email: "",
  },
  skills: [],
  exp: [],
  edu: [],
  others: [],
};

type ArrayKeys = 'skills' | 'exp' | 'edu' | 'others';
type ArrayElement<K extends ArrayKeys> =
  K extends 'skills' ? Skill :
  K extends 'exp' ? Experience :
  K extends 'edu' ? Education :
  K extends 'others' ? OtherSection :
  never;

export const useCvStore = create<Cvstore>()(
  persist(
    (set) => {
      const updateArray = <K extends ArrayKeys>(
        key: K,
        updater: (arr: ArrayElement<K>[]) => ArrayElement<K>[]
      ) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            [key]: updater((state.cvData[key] ?? []) as ArrayElement<K>[]),
          },
          _lastUpdated: Date.now(),
        }));

      return {
        cvData: initialUser,
        _lastUpdated: Date.now(),

        // --- Personal Info ---
        setPersonalInfo: (data) =>
          set((state) => ({
            cvData: { ...state.cvData, personal: data },
            _lastUpdated: Date.now(),
          })),
        upDatePersonalInfo: (data) =>
          set((state) => ({
            cvData: {
              ...state.cvData,
              personal: { ...state.cvData.personal, ...data },
            },
            _lastUpdated: Date.now(),
          })),

        // --- Skills ---
        setSkill: (data) => updateArray("skills", (arr) => [...arr, data]),
        updateSkill: (id, data) =>
          updateArray("skills", (arr) =>
            arr.map((i) => (i.id === id ? { ...i, ...data } : i))
          ),
        removeSkill: (id) =>
          updateArray("skills", (arr) => arr.filter((i) => i.id !== id)),

        // --- Experience ---
        setExperience: (data) => updateArray("exp", (arr) => [...arr, data]),
        updateExperience: (id, data) =>
          updateArray("exp", (arr) =>
            arr.map((i) => (i.id === id ? { ...i, ...data } : i))
          ),
        removeExperience: (id) =>
          updateArray("exp", (arr) => arr.filter((i) => i.id !== id)),

        // --- Education ---
        setEducation: (data) => updateArray("edu", (arr) => [...arr, data]),
        updateEducation: (id, data) =>
          updateArray("edu", (arr) =>
            arr.map((i) => (i.id === id ? { ...i, ...data } : i))
          ),
        removeEducation: (id) =>
          updateArray("edu", (arr) => arr.filter((i) => i.id !== id)),

        // --- Others ---
        setOthers: (data) =>
          updateArray("others", (arr) => [...(arr || []), data]),
        updateOtherSection: (id, data) =>
          updateArray("others", (arr) =>
            (arr || []).map((i) => (i.id === id ? { ...i, ...data } : i))
          ),
        removeOtherSection: (id) =>
          updateArray("others", (arr) =>
            (arr || []).filter((i) => i.id !== id)
          ),

        // --- Clear Data ---
        clearData: () =>
          set({
            cvData: initialUser,
            _lastUpdated: Date.now(),
          }),
      };
    },
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        cvData: state.cvData,
        _lastUpdated: state._lastUpdated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const isExpired = Date.now() - state._lastUpdated > CACHE_DURATION_MS;
          if (isExpired) {
            state.clearData();
          }
        }
      },
    }
  )
);
