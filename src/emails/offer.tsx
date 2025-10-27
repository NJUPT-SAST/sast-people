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
            src={`https://storage.sast.fun/sast-email-header.png`}
            width="300"
            alt="banner"
          />
          <Section>
            <Text style={{ ...text, marginTop: '50px' }}>Hi {name},</Text>
            {accept ? (
              <>
                <Text style={text}>
                  恭喜你顺利通过 {flowName}，正式成为南京邮电大学大学生科学技术协会的一员。
                </Text>
                <Text style={text}>
                  我们欣赏你对技术的热情和积极的态度。在这里，希望你能与志同道合的伙伴们一起，将脑海中天马行空的创意变为现实，在项目实战中挑战自我，感受协同攻克难关的纯粹快乐。
                </Text>
                <Text style={text}>
                  未来，让我们在这条路上共同学习、进步，在自己所热爱的世界里闪闪发光。
                </Text>

                <hr />

                <Text style={importantText}>
                  【重要步骤】<br />
                  请注意：以下信息请勿向其他人分享
                </Text>

                <Text style={text}>
                  1. 为完善你的成员信息，请务必在今日内填写社团管理系统成员信息收集表
                </Text>
                <Button
                  style={button}
                  href="https://njupt-sast.feishu.cn/share/base/form/shrcnfwRMIhYP8N2I1i4YaTNg9b">
                  点击填写 成员信息收集表
                </Button>

                <Text style={text}>
                  2. 请注册个人飞书账号（
                  <Link href="https://www.feishu.cn/hc/zh-CN/articles/360045688853-%E6%B3%A8%E5%86%8C%E8%B4%A6%E5%8F%B7" style={anchor}>
                    注册说明
                  </Link>
                  ）并加入“SAST.2025 软多Family”飞书群，和学长及其他新成员一起交流
                </Text>
                <Button
                  style={button}
                  href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=1ack8f0f-dea7-494a-9d11-09873f28d150">
                  点击加入 SAST.2025 软多Family
                </Button>

                <hr style={{ margin: '16px 0' }} />

                <Text style={importantText}>
                  【查看授课日历】
                </Text>
                <Text style={text}>
                  通过个人飞书账号，订阅
                  <Link href="https://www.feishu.cn/calendar/share/calendar?token=18E3hIfkra9WK2xhrs__6dsQmLD-cvf59shJz8ZEWoNQzRsv5VNz4ssCMIEaYP-yGTlM_or_eg==" style={anchor}>
                    科协公开活动
                  </Link>
                  ，获取最新授课日历
                </Text>

                <hr />

                <Text style={text}>
                  我们真诚地欢迎你的加入！
                </Text>
              </>
            ) : (
              <>
                <Text style={text}>
                  感谢你参加 {flowName}，你在整个过程中的出色表现，以及展现出的技术才华和学习热情，给我们留下了深刻的印象。
                </Text>
                <Text style={text}>
                  我们对每一位参与者都进行了慎重和综合的评估。经过艰难的抉择，我们很遗憾地通知你，本次未能通过我们的考核。我们深知这个结果可能会让你感到失望，但这绝非对你个人能力的否定，你的才华依然闪耀。
                </Text>
                <Text style={text}>
                  我们希望这次经历不会影响你对技术的热爱，并诚挚地邀请你继续参加我们接下来的授课活动。此外，我们的“寒假大作战”活动也依然向你开放，这是你再次展示自己能力并加入我们的另一个机会。
                </Text>
                <Text style={text}>
                  希望你能继续保持这份对技术的热忱，不断精进，再接再厉。我们期待在未来的活动中再次看到你的身影！
                </Text>

                <hr />

                <Text style={importantText}>
                  【查看授课日历】
                </Text>
                <Text style={text}>
                  通过个人飞书账号，订阅
                  <Link href="https://www.feishu.cn/calendar/share/calendar?token=18E3hIfkra9WK2xhrs__6dsQmLD-cvf59shJz8ZEWoNQzRsv5VNz4ssCMIEaYP-yGTlM_or_eg==" style={anchor}>
                    科协公开活动
                  </Link>
                  ，获取最新授课日历
                </Text>

                <hr />

                <Text style={text}>
                  再次感谢你的参与！
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
              src="https://storage.sast.fun/sast-logo.png"
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

const importantText = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '700',
  color: '#404040',
  lineHeight: '26px',
};

const button = {
  backgroundColor: '#17A34A',
  borderRadius: '12px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: 'fit-content',
  padding: '14px 14px',
};

const anchor = {
  textDecoration: 'underline',
};
