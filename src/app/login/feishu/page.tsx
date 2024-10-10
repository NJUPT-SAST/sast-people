import { FeishuSDKInject } from '@/components/feishuInject';
import { Loader } from 'lucide-react';
import React from 'react';

const FeishuAuth: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <Loader size={32} className="animate-spin" />
      <p className="text-lg">飞书授权登录中……</p>
      <FeishuSDKInject />
    </div>
  );
};

export default FeishuAuth;
