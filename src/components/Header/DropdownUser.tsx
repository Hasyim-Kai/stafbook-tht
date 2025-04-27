
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { appConfig } from '@/utils/app-config';
import { cn } from '@/utils/helper/style-merger';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';


const DropdownUser = () => {
  const nav = useNavigate();
  function onSignOut() {
    localStorage.removeItem(appConfig.localStorageName);
    nav("/signin");
  }

  return <>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} className={cn("bg-transparent font-semibold flex gap-3 items-center",)}>
          Hi, User
          <Avatar className="w-7 h-7 shadow shadow-sky-200">
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
          {/* <ChevronsUpDown color="blue" size={14} /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn(`bg-white dark:bg-boxdark shadow-md`)}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <Link to={`/profile`} className="flex items-center">
            <CircleUserRound size={16} color="gray" className="mr-2" />Profile
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut size={16} color="gray" className="mr-2" />Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
};

export default DropdownUser;
