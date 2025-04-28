import { useContext } from "react";
import AuthContext from "../context/authcontext";

export const usePermissions = () => {
  const { permissions } = useContext(AuthContext);

  const hasPermission = (permName) => {
    return permissions.some(
      (p) => p.OptionName.toLowerCase().trim() === permName.toLowerCase().trim() && p.Active
    );
  };

  return { hasPermission };
};
