import { useEffect } from 'react';

const ChannelTalk = () => {
  useEffect(() => {
    // 이미 초기화됐는지 확인
    if (window.ChannelIOInitialized) {
      console.log('ChannelIO already initialized');
      return;
    }

    // 초기화 중복 방지
    window.ChannelIOInitialized = true;

    const ch = function () {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q.push(args);
    };
    window.ChannelIO = ch;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
    script.onload = () => {
      // 스크립트 로드 후에 boot 호출
      window.ChannelIO('boot', {
        pluginKey: 'fe44e3ba-d048-461f-9874-605a24f6125e',
      });
    };

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    // Optional cleanup
    return () => {
      // window.ChannelIO('shutdown'); // 종료 처리하고 싶다면 사용
    };
  }, []);

  return null;
};

export default ChannelTalk;
