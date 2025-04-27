import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/utils/helper/style-merger';
import { Grid2X2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../logo';
import { adminSdebarData } from './sidebarData';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const sidebarData = adminSdebarData;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return <aside
    ref={sidebar}
    className={`absolute left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden 
      shadow-lg
      bg-gradient-to-tl from-slate-900 to-slate-800
      dark:bg-gradient-to-tl dark:from-boxdark dark:via-boxdark dark:to-slate-900
      lg:static lg:translate-x-0 duration-300 ease-linear 
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    {/* <!-- SIDEBAR HEADER --> */}
    <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6">
      <NavLink to="/">
        <Logo />
      </NavLink>

      <button
        ref={trigger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        className="block lg:hidden" >
        <svg
          className="fill-current"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg" >
          <path
            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
            fill=""
          />
        </svg>
      </button>
    </div>
    {/* <!-- SIDEBAR HEADER --> */}

    <ScrollArea className="">
      <nav className="p-3 flex flex-col duration-300 ease-linear">
        <ul className="mb-6 text-sm flex flex-col gap-1.5">
          {sidebarData.map((item, index) => item.type === 'title'
            ? <li key={index} className={cn("ml-4 text-sm font-semibold text-bodydark2",
              index === 0 ? "mb-4" : "my-5",
            )}>
              <h3>{item.name}</h3>
            </li>
            : item.children
              ? <li key={index}>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1" className='border-0'>
                    <AccordionTrigger className={`rounded-md px-4 py-2 font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 hover:no-underline
                         ${(pathname.includes(item.path)) && 'bg-graydark dark:bg-meta-4'}`}>
                      <div className={cn(`flex items-center gap-3`)}>
                        {item.icon ? item.icon : <Grid2X2 size={18} />}
                        {item.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.children.map((child, index) => <NavLink to={child.path} key={index}
                        className={({ isActive }) =>
                          'group mt-3 pl-11 relative flex items-center gap-3 rounded-md px-4 font-medium text-bodydark2 hover:text-white ' +
                          (isActive && '!text-white')
                        }>
                        {child.name}
                      </NavLink>)}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
              : <li>
                <NavLink to={item.path}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                ${pathname.includes(item.path) && 'bg-graydark dark:bg-meta-4'}`}>
                  {item.icon ? item.icon : <Grid2X2 size={18} />}
                  {item.name}
                </NavLink>
              </li>)}
        </ul>
      </nav>
    </ScrollArea>
  </aside>
};

export default Sidebar;
