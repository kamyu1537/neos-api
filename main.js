const Fastify = require('fastify');
const axios = require('axios');
const createError = require('http-errors');

const cloudXBaseUrl = 'https://cloudx.azurewebsites.net/api/users/';

const fastify = Fastify();

// 디렉토리 경로 가져오기
fastify.get('/neosrec/:userId/:id', async (req) => {
  const { userId, id } = req.params;
  const { data, status } = await axios.get(
    `${cloudXBaseUrl}/${userId}/records/${id}`
  );
  if (status !== 200) throw createError(500, 'server error');
  return `${data.path}\\${encodeURIComponent(data.name)}`;
});

// 에셋 목록 가져오기
fastify.get('/assets/:userId/*', async (req) => {
  const userId = req.params.userId;
  const path = req.params['*'];

  const param = path.split('/').map(encodeURIComponent).join('\\');
  const { data, status } = await axios.get(
    `${cloudXBaseUrl}/${userId}/records?path=${param}`
  );
  if (status !== 200) throw createError(500, 'server error');

  const result = data.reduce((acc, cur) => {
    if (cur.recordType !== 'object') return acc;
    if (!cur.isPublic || cur.isDeleted) return acc;

    const data = [cur.id, cur.name, cur.thumbnailUri, cur.assetUri];

    acc.push(data.map(encodeURI).join('|'));
    return acc;
  }, []);

  return result.join('\n');
});

fastify.listen({
  port: 9812,
  host: '0.0.0.0',
});
