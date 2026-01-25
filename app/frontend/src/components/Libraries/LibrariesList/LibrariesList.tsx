import iziToast from "izitoast";
import { useEffect, useState } from "react";
import API from "../../../api/API";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setLibrariesState } from "../../../store/slices/librariesSlice";
import LoaderMain from "../../Loader/LoaderMain";
import LibrariesListItems from "./LibrariesListItems";

function LibrariesList() {
  const [error, setError] = useState<boolean>(false);
  const { librariesAPI } = API();
  const librariesState = useAppSelector(state => state.libraries);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(false);

    dispatch(setLibrariesState({ loading: true }));

    librariesAPI.search({
      limit: librariesState.limit, offset: librariesState.offset, name: librariesState.nameSearch,
    })
      .then(result => {  
        if (result.data.length > 0) {
          dispatch(setLibrariesState({ list: result.data, loading: false }));
        } else {
          dispatch(setLibrariesState({ offset: 0, loading: false }));
        }
      })
      .catch(err => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
          position: 'bottomCenter',
        });
      });
  }, [librariesState.offset, librariesState.nameSearch]);

  return (
    <>
      {librariesState.loading ? (
        <LoaderMain />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке списка!</p>
        ) : (
          <LibrariesListItems list={librariesState.list} />
        )
      )}
    </>
  )
}

export default LibrariesList