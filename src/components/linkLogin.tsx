'use client';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { redirectSASTLink } from '@/action/user/link';

export const LinkLogin = () => {
  return (
    <Button
      className="py-6 px-12 text-white"
      onClick={async () => redirectSASTLink()}
    >
      <Image
        width={25}
        height={25}
        src={'/images/link.svg'}
        alt="link logo"
        className="mr-4"
      />
      <span>使用 SAST Link 登录</span>
    </Button>
  );
};
