import React, { useEffect } from "react";
import { PermissionOperator } from "../../../layout/Permision";

interface OperatorProps {
  permissions: any;
  setPermissions: (updated: any) => void;
  userPermissionHave: any; // Permissions retrieved from DB
}

const EditOperator: React.FC<OperatorProps> = ({ permissions, setPermissions, userPermissionHave }) => {
  
  useEffect(() => {
    if (userPermissionHave){
      const initialPermissions = PermissionOperator.reduce((acc, item) => {
        acc[item.name] = item.permissions.reduce((permAcc: any, perm: string) => {
          permAcc[perm] = userPermissionHave[item.name]?.[perm] ?? false;
          return permAcc;
        }, {});
        return acc;
      }, {} as { [key: string]: { [key: string]: boolean } });
  
      setPermissions(initialPermissions);
    }else{
          const initialPermissions: { [key: string]: { [key: string]: boolean } } = {};
          PermissionOperator.forEach((item) => {
            initialPermissions[item.name] = {};
            item.permissions.forEach((perm:any) => {
              initialPermissions[item.name][perm] = item.value.includes(perm);
            });
          });
          setPermissions(initialPermissions);
    }
  }, [userPermissionHave]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, category: string, perm: string) => {
    setPermissions((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [perm]: e.target.checked,
      },
    }));
  };

  return (
    <div>
      <h2 className="text-black text-sm font-semibold px-4 my-2">Permission</h2>
      <div className="px-4 py-2 grid grid-cols-4 gap-6 sm:grid-cols-5">
        {PermissionOperator.map((val) => (
          <div key={val.name}>
            <h1 className="py-2 text-black text-sm font-medium">{val.name}</h1>
            {val.permissions.map((perm: string) => (
              <div className="globalform flex w-full py-1" key={`${val.name}-${perm}`}>
                <label htmlFor={`${val.name}-${perm}`} className="mb-1 block w-1/2 text-sm font-medium dark:text-white">
                  {perm}
                </label>
                <input
                  type="checkbox"
                  id={`${val.name}-${perm}`}
                  checked={permissions[val.name]?.[perm] || false}
                  onChange={(e) => handleInputChange(e, val.name, perm)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditOperator;
