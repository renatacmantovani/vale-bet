export const login = async (email: string, senha: string) => {
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: senha }) // 👈 senha como "password"
  });

  const text = await res.text(); // <- primeiro pega como texto
  let data;

  try {
    data = JSON.parse(text); // tenta converter pra JSON
  } catch (err) {
    throw new Error('Resposta inesperada do servidor.');
  }

  if (!res.ok) throw new Error(data.error || 'Falha no login');

  localStorage.setItem('token', data.token);
  return data;
};
  
  export const getToken = () => localStorage.getItem('token');
  
  export const logout = () => localStorage.removeItem('token');
  