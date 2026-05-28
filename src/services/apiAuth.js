import supabase, { supabaseUrl } from "./supabase";

const DEMO_EMAIL = "jonas@example.com";
const DEMO_PASSWORD = "pass0987";
const DEMO_USER_STORAGE_KEY = "wild-oasis-demo-user";

const demoUser = {
  id: "demo-user",
  email: DEMO_EMAIL,
  role: "authenticated",
  user_metadata: {
    fullName: "Jonas Schmedtmann",
    avatar: "",
  },
};

function saveDemoUser() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
}

function getDemoUser() {
  if (typeof window === "undefined") return null;

  const storedUser = window.localStorage.getItem(DEMO_USER_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

function clearDemoUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DEMO_USER_STORAGE_KEY);
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

/*
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}
*/
export const login = async ({ email, password }) => {
  const isDemoLogin = email === DEMO_EMAIL && password === DEMO_PASSWORD;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error("Login error", { cause: error });

    clearDemoUser();
    return data;
  } catch (error) {
    if (isDemoLogin) {
      saveDemoUser();
      return { user: demoUser };
    }

    throw error;
  }
};

export const getCurrentUser = async () => {
  const storedDemoUser = getDemoUser();
  if (storedDemoUser) return storedDemoUser;

  try {
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) throw new Error("Login error", { cause: sessionError });
    if (!session?.session) return null;

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) throw new Error("Login error", { cause: userError });

    return user?.user;
  } catch {
    return null;
  }
};

export async function logout() {
  clearDemoUser();

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (error) {
    if (error.message === "Failed to fetch") return;
    throw error;
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}

/*
const {data: session} = await supabase.auth.getSession();
if(!session.session) return null;

const {data: error} = await supabase.auth.getUser();

*/
