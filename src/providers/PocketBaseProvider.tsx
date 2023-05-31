import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
  PropsWithChildren,
} from "react";
import PocketBase, { Record, RecordAuthResponse, Admin } from "pocketbase";
import { useInterval } from "usehooks-ts";
import jwtDecode from "jwt-decode";
import ms from "ms";

const BASE_URL = "https://set-aim-av1.prg-dev.com";
const fiveMinutesInMs = ms("5 minutes");
const twoMinutesInMs = ms("2 minutes");

type ContextArgs<T = Record> = {
  register: (email: any, password: any) => Promise<T>;
  login: (email: any, password: any) => Promise<RecordAuthResponse<Record>>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  user: Record | Admin | null;
  pb: PocketBase;
  getTotalStudents: () => Promise<void>;
  totalStudents: number;
};

const PocketContext = createContext<ContextArgs>({});

export const PocketProvider = ({ children }: PropsWithChildren<any>) => {
  const pb = useMemo(() => new PocketBase(BASE_URL), []);

  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  const register = useCallback(async (email, password) => {
    return await pb
      .collection("users")
      .create({ email, password, passwordConfirm: password });
  }, []);

  const login = useCallback(async (email, password) => {
    return await pb.admins.authWithPassword(email, password);
  }, []);

  const logout = useCallback(() => {
    pb.authStore.clear();
  }, []);

  const [totalStudents, setTotalStudents] = useState(0);
  const getTotalStudents = useCallback(async () => {
    const resp = await pb.collection("students").getFullList();
    setTotalStudents(resp.length);
  }, []);

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return;
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000;
    if (tokenExpiration < expirationWithBuffer) {
      await pb.collection("users").authRefresh();
    }
  }, [token]);

  useInterval(refreshSession, token ? twoMinutesInMs : null);

  return (
    <PocketContext.Provider
      value={
        {
          register,
          login,
          logout,
          user,
          token,
          pb,
          totalStudents,
          getTotalStudents,
        } as {
          register: typeof register;
        }
      }
    >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);
