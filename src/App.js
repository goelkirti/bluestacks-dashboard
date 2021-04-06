import logo from './logo.svg';
import './App.css';
import AppHeader from './components/appHeader/appHeader'
import PageHeader from './components/pageHeader/pageHeader'
import TabPane from './components/tabCorner/tabPane';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <PageHeader />
      <div class="tabContainer">
        <TabPane/>
      </div>
    </div>
  );
}

export default App;
