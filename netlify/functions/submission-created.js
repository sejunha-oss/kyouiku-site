// 폼 문의가 접수되면 Netlify가 자동으로 실행합니다 (파일 이름이 그 약속입니다)
exports.handler = async (event) => {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) {
    console.log('SHEET_WEBHOOK_URL 이 설정되지 않았습니다');
    return { statusCode: 200, body: 'no url' };
  }
  try {
    const { payload } = JSON.parse(event.body);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: payload.id,
        form_name: payload.form_name,
        data: payload.data,
      }),
      redirect: 'follow',
    });
    console.log('시트 전송 결과:', res.status, (await res.text()).slice(0, 80));
  } catch (err) {
    console.log('시트 전송 실패:', String(err));
  }
  return { statusCode: 200, body: 'ok' };
};
