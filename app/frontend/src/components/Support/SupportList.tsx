import iziToast from "izitoast";
import { useEffect, useState } from "react";
import API from "../../api/API";
import { useAppSelector } from "../../store/hooks";
import { GetChatListParams } from "../../types/interfaces";
import LoaderMain from "../Loader/LoaderMain";
import SupportTable from "./SupportTable";

function SupportList() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<any>([]);
  const user = useAppSelector(state => state.user);
  const { supportRequestAPI } = API();

  useEffect(() => {
    setError(false);
    setLoading(true);

    const query: GetChatListParams = {
      userId: user.id,
      isActive: true,
    }

    if (user.role === 'manager') {
      query.userId = null;
    }

    supportRequestAPI.findRequests(query)
      .then(result => {  
        setList(result.data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
          position: 'bottomCenter',
        });
      });
  }, []);

  return (
    <>
      {loading ? (
        <LoaderMain />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке обращений!</p>
        ) : (
          <SupportTable list={list} />
        )
      )}
    </>
  )
}

export default SupportList;
