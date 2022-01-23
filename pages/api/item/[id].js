import db from '../../../db';

const TABLE_NAME = 'inventory';

async function updateItem({ item }) {
  // eslint-disable-next-line no-console
  console.log(`Update Item: ${JSON.stringify(item)}`);
  const params = {
    TableName: TABLE_NAME,
    Item: {
      ...item,
      last_updated_at: Math.floor(Date.now() / 1000),
    },
    ConditionExpression: 'deleted <> :deleted',
    ExpressionAttributeValues: {
      ':deleted': true,
    },
  };

  const result = await db.put(params).promise();

  return result;
}

async function deleteItem(id, { item }) {
  // eslint-disable-next-line no-console
  console.log(`Delete Item: ${JSON.stringify(item)}`);
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
      created_at: item.created_at,
    },
    ConditionExpression: 'deleted <> :deleted',
    UpdateExpression: 'SET deleted_at = :deleted_at, deleted = :deleted',
    ExpressionAttributeValues: {
      ':deleted_at': Math.floor(Date.now() / 1000),
      ':deleted': true,
    },
    ReturnValues: 'ALL_NEW',
  };

  // To really delete the item uncomment the next line
  // const result = await db.delete(params).promise();
  // Good practice is to never delete records from DB. Instead flag them as deleted.

  const result = await db.update(params).promise();

  return result;
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @returns
 */
export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const result = await updateItem(req.body);
    res.status(200).json(result);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    await deleteItem(id, req.body);
    res.status(204).send();
  } else {
    res.status(405).json({ error: 'Method not supported.' });
  }
}
