'use client';
import { checkUserByStuID, findUserByUid } from './checkUser';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useZxing } from 'react-zxing';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useMediaDevices } from 'react-media-devices';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Camera, Pause } from 'lucide-react';
import { useUserInfoById } from '@/hooks/useUserInfoById';
import { toast } from 'sonner';
import { userType } from '@/types/user';
import { DialogClose } from '@radix-ui/react-dialog';

const QRCodeScanner = () => {
  const { devices } = useMediaDevices({
    constraints: { video: true, audio: false },
  });
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [paused, setPaused] = useState(true);
  const { ref } = useZxing({
    async onDecodeResult(result) {
      const res = JSON.parse(atob(result.getText()));
      handleProcessStudent(res);
    },
    // paused: paused,
    deviceId: selectedDevice || undefined,
  });
  const filteredDevices = useMemo(() => {
    const realDevices = devices?.filter((value) => value.deviceId);
    setSelectedDevice(realDevices?.length ? realDevices[0].deviceId : null);
    return realDevices;
  }, [devices]);
  const [showDialog, setShowDialog] = useState(false);
  const [userInfo, setUserInfo] = useState<userType>();

  const handleProcessStudent = async ({
    uid,
    time: number,
  }: { uid: number; time: number }) => {
    const userInfo = await useUserInfoById(uid).catch(() => {
      toast.error('未找到该学生');
      return null;
    });
    if (!userInfo) {
      return;
    }
    setUserInfo(userInfo);
    setShowDialog(true);
  };

  return (
    <div className="h-[50vw] relative">
      {paused && (
        <div className="h-full flex justify-center items-center rounded-lg border-muted border-solid border-[1.5px] absolute top-0 left-0 z-10 backdrop-blur-lg w-full">
          <div className="flex flex-col items-center gap-4 opacity-75">
            <Select
              value={selectedDevice || undefined}
              onValueChange={(value) => setSelectedDevice(value)}
            >
              <SelectTrigger className="min-w-[270px]">
                <SelectValue placeholder="请选择摄像头" />
              </SelectTrigger>
              <SelectContent>
                {filteredDevices &&
                  filteredDevices.map((flow) => (
                    <SelectItem key={flow.deviceId} value={flow.deviceId}>
                      {flow.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setPaused(false)}
            >
              <Camera className="w-4 h-4 mr-3" />
              开始扫描
            </Button>
          </div>
        </div>
      )}
      <video ref={ref} className="rounded-lg w-full h-full object-cover" />
      <div
        onClick={() => setPaused(true)}
        className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center bg-white cursor-pointer opacity-50 hover:opacity-100"
      >
        <Pause className="w-4 h-4" strokeWidth={1.5} />
      </div>
      <Dialog open={showDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认学生信息</DialogTitle>
          </DialogHeader>
          <ul>
            <li>学号: {userInfo?.studentId}</li>
            <li>姓名: {userInfo?.name}</li>
            <li>专业: {userInfo?.major}</li>
          </ul>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              取消
            </Button>
            <Link href={`/dashboard/review/marking?user=${userInfo?.studentId}`}>
              <Button>确认</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QRCodeScanner;
