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
  flowName?: string;
  accept?: boolean;
}

export const OfferEmail = ({ name, flowName, accept }: OfferEmailProps) => {
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
            {accept ? (
              <>
                <Text style={text}>
                  恭喜你通过了 {flowName}
                  &nbsp;，成功加入南京邮电大学大学生科学技术协会。我们看到了你对技术的热情，认可你的态度。希望在接下来的日子里，你能和志同道合的人在科协的丰富活动中做想做的事。
                  今后，在这条路上，让我们一起学习共同进步，在自己所热爱的世界里闪闪发光。
                </Text>
                <Text style={text}>
                  请加入 SASTer 2024 新伙伴群：894545066 ，一起踏入新的旅途吧！
                </Text>
                <Text style={text}>
                  欢迎使用 SAST Evento 查看我们的日常授课与最新活动 &nbsp;
                  <Link href="https://evento.sast.fun" style={anchor}>
                    evento.sast.fun
                  </Link>
                </Text>
              </>
            ) : (
              <>
                <Text style={text}>
                  感谢你参加 {flowName}，你的卓越表现给我们留下了深刻的印象。
                  经过慎重评估和综合考虑后，我们很遗憾地通知你，你未能通过我们的考核。这不代表我们否定你的技术能力，你的才华依然闪耀，
                  我们同样在你身上看到了你对于技术的渴望和学习的热情。接下来的授课活动以及寒假的
                  Winter of Code / Design
                  活动依然向你开放。希望在接下来的日子里，你能保持对技术的热爱，再接再厉！
                </Text>
                <Text style={text}>
                  欢迎使用 SAST Evento 查看我们的日常授课与最新活动 &nbsp;
                  <Link href="https://evento.sast.fun" style={anchor}>
                    evento.sast.fun
                  </Link>
                </Text>
              </>
            )}
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
  name: 'Maxtune',
  flowName: 'SAST 2024',
  // accept: true,
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
