// app/login/page.js
import SimpleLayout from '../layouts/SimpleLayout';


export default function LoginPage() {
  return (
    <SimpleLayout>
      <div className="login-page">
        <h2 className="title">Página de Login</h2>
        <p className="description">
          Faça login ou crie uma nova conta para acessar o site.
        </p>
        {}
      </div>
    </SimpleLayout>
  );
}