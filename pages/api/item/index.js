import db from '../../../db';
import { getUniqueId } from '../../../utils';

const TABLE_NAME = 'inventory';

async function getAllItems({ category }) {
  const params = {
    TableName: TABLE_NAME,
    ProjectionExpression: 'title, description, category, #URL, #ID, #CA',
    FilterExpression: 'deleted <> :deleted',
    ExpressionAttributeNames: {
      '#URL': 'url',
      '#ID': 'id',
      '#CA': 'created_at',
    },
    ExpressionAttributeValues: {
      ':deleted': true,
    },
  };

  let useQuery = false;
  if (category) {
    useQuery = true;
    params.IndexName = 'category-index';
    params.KeyConditionExpression = 'category = :cat';
    params.ExpressionAttributeValues[':cat'] = category;
  }

  let result;
  if (useQuery) {
    result = await db.query(params).promise();
  } else {
    result = await db.scan(params).promise();
  }

  return {
    data: result.Items,
    total: result.Count,
  };
}

async function createItem({ item }) {
  // eslint-disable-next-line no-console
  console.log(`Create Item: ${JSON.stringify(item)}`);
  const itemWithId = {
    ...item,
    id: getUniqueId(),
    created_at: Math.floor(Date.now() / 1000),
    deleted_at: null,
    deleted: false,
    last_updated_at: null,
  };

  const params = {
    TableName: TABLE_NAME,
    Item: itemWithId,
  };

  await db.put(params).promise();

  return itemWithId;
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @returns
 */
export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (!req.body) {
      res.status(400).json({ error: 'Missing payload.' });
      return;
    }
    const result = await createItem(req.body);
    res.status(201).json(result);
  } else if (req.method === 'GET') {
    const { query } = req;
    const result = await getAllItems(query);

    res.status(200).json(result);
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
