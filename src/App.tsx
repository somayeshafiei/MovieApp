import { FormProvider } from './context/FormContext';
import AddMovieForm from './layout/AddMovieForm';
import Header from './layout/Header';
import { DataProvider } from './context/DataContext';
import MovieTable from './layout/MovieTable';
import { EditProvider } from './context/EditContext';

function App() {
  return (
    <>
      <DataProvider>
        <EditProvider>
          <FormProvider>
            <Header />
            <AddMovieForm />
            <MovieTable />
          </FormProvider>
        </EditProvider>
      </DataProvider>
    </>
  );
}

export default App;
