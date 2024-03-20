import { useEffect, useState } from 'react';
import SuprSendInbox from '@suprsend/react-inbox';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/Menubar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"


export default function Home() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("singh@gmail.com");

  useEffect(() => {
    fetchId();
  }, []);

  const fetchId = async () => {
    try {
      const response = await fetch(`/api/subId/${email}`);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const register = async () => {
    try {
      const response = await fetch(`/api/register/${email}`);
      const responseData = await response.json();
      fetchId();
      return responseData;
    }
    catch (err) {
      console.error('Error fetching data:', error);
    }
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async () => {
    const reg = await register();
  }

  return (
    <div>
      <Menubar className="flex justify-center items-center">
        <MenubarMenu>
          <Popover>
            <PopoverTrigger className='text-sm font-medium pl-5'>Registration</PopoverTrigger>
            <PopoverContent className="flex flex-col space-y-4">
              <Label htmlFor="width">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                className="col-span-2 h-8 py-2"
                onChange={handleChange}
              />
              <Button onClick={handleSubmit}>Submit</Button>
              <></>
            </PopoverContent>
          </Popover>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{email}</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            {data && <SuprSendInbox
              workspaceKey={process.env.WORKSPACE_KEY}
              workspaceSecret={process.env.WORKSPACE_SECRET}
              subscriberId={data.id}
              distinctId={email}
            />}</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <div className="flex items-center justify-center mt-64">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className='flex flex-col items-center justify-start mt-12'>
        Ready to join? Simply enter your email to get started with registration
        <div>Be on the lookout for an notification confirming your entry into our platform from suprsend</div>
      </div>
    </div>
  );
}
