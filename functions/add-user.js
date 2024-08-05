const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://your-supabase-url';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  const { username, firstName, lastName, email, department, position } = JSON.parse(event.body);

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, firstName, lastName, email, department, position }]);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
