import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface OfferEmailProps {
  name?: string;
  offerLink?: string;
}

export const OfferEmail = ({ name, offerLink }: OfferEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>SAST Invitation</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://aliyun.sastimg.mxte.cc/images/2024/10/11/Frame-15341783402d1932190.png`}
            width="300"
            alt="banner"
          />
          <Section>
            <Text style={{ ...text, marginTop: '50px' }}>Hi {name},</Text>
            <Text style={text}>
              恭喜你通过了 SAST
              的招新考核，成功加入南京邮电大学大学生科学技术协会。我们看到了你对技术的热情，认可你的态度。希望在接下来的日子里，你能和志同道合的人在科协的丰富活动中做想做的事。
              今后，在这条路上，让我们一起学习共同进步，在自己所热爱的世界里闪闪发光。
            </Text>
            <Button style={button} href={offerLink}>
              加入 SAST
            </Button>
            <Text style={text}>
              如果你有更多疑问，请联系 recruitment@sast.fun
            </Text>
            <Text style={text}>祝心想事成!</Text>
          </Section>
          <Section
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Img
              src="https://aliyun.sastimg.mxte.cc/images/2023/07/21/Property-155f851395722ff55.png"
              width={70}
            />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

OfferEmail.PreviewProps = {
  name: '李正楠',
  offerLink: 'https://people.sast.fun',
} as OfferEmailProps;

export default OfferEmail;

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px',
};

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px',
};

const button = {
  backgroundColor: '#17A34A',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '14px 7px',
};

const anchor = {
  textDecoration: 'underline',
};
