import { signOut } from "next-auth/react"
import React from "react"

interface AccountMenuProps {
    visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    visible
}) => {
    if (!visible) {
        return null;
    }
    return (
        <div className="bg-red-600 w-56 absolute top-14 right-0 py-5 flex-col border-2 flex">
            <div className="flex flex-col gap-1">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img className="w-8 rounded-md" src="/images/userprofile.jpg" alt="profile" />
                    <p className="text-white text-sm group-hover/item:underline">
                        UserName
                    </p>
                </div>
                <hr className="bg-white border-0 h-px my-4" />
                <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
                    Sign Out
                </div>
            </div>

        </div>
    )
}
export default AccountMenu