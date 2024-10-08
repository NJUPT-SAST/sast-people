'use client';
import { checkUserByStuID, findUserByUid } from './checkUser';
import React, { useEffect, useState } from 'react';
import { useZxing } from 'react-zxing';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

interface ReviewProps {
  task: string;
}

const QRCodeScanner: React.FC = () => {
  const [data, setData] = useState('');
  const { ref } = useZxing({
    onDecodeResult(result) {
      setData(result.getText());
    },
  });
  const [checkUserResult, setCheckUserResult] = useState(false);
  const handleCheckUser = async (data: string) => {
    if (checkUserResult) return;
    if (data.length < 9) return;
    else if (data.length === 9) {
      setCheckUserResult(await checkUserByStuID(data));
    } else {
      const info = JSON.parse(atob(data));
      await findUserByUid(info.uid).then((res) => {
        if (res.studentId === null) {
          toast.error('错误的考生学号，请重新输入或扫描');
          setCheckUserResult(false);
          return;
        }
        setCheckUserResult(true);
        setData(res.studentId);
    }).catch((err) => {
      setCheckUserResult(false);
      toast.error(err.message);
    });
  }};
  useEffect(() => {
    handleCheckUser(data);
  }, [data]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <Label className="min-w-10">考生:</Label>
        <Input
          value={data}
          onChange={(e) => setData(e.target.value)} // 添加onChange事件处理器
          placeholder="请输入考生学号或扫描考生个人识别二维码"
        />
        {checkUserResult ? (
          <Link href={'/dashboard/review/marking?user=' + data}>
            <div className="flex-none">
              <Button
                size="sm"
                onClick={() => {
                  handleCheckUser;
                }}
              >
                开始阅卷
              </Button>
            </div>
          </Link>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                onClick={() => {
                  handleCheckUser;
                }}
                disabled={data.length != 9}
              >
                开始阅卷
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>错误</DialogTitle>
              </DialogHeader>
              <p>错误的考生学号，请重新输入或扫描</p>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <video ref={ref} />
      </div>
    </div>
  );
};

export default QRCodeScanner;
