import Layout from '../components/Layout';
import '../src/app/globals.css';

interface MyAppProps {
    Component: any,
    pageProps: any
}

const MyApp: React.FC<MyAppProps> = ({Component, pageProps}) => {
    return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
}
export default MyApp;
