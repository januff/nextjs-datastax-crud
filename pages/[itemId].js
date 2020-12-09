import { useRouter } from 'next/router'
import { useItem, useUpdateItem, useDeleteItem } from '../db/datastax' 
import Form from "../components/Form";
import Link from 'next/link'

export default function Item() {  
  const router = useRouter()
  const { query : { itemId } } = router
  const item = useItem(itemId)
  const [saveItem, saveInfo] = useUpdateItem()
  const [deleteItem] = useDeleteItem()

  const onDelete = async () => {
    router.push('/')
    deleteItem(itemId)
  }   

  return (
    <section>
      {item.isLoading ? 
        <span>Loading...</span> : (
          <h3>{item.data?.name} 
          {item.isFetching ? 
            <small>🕒</small> : null}
          </h3>
      )}
      <div className="testing">
        <Form 
          itemId={itemId} 
          onSubmit={saveItem}
          initialValues={item.data} 
          submitText={
            saveInfo.isLoading
              ? 'Saving...'
              : saveInfo.isError
              ? 'Error!'
              : saveInfo.isSuccess
              ? 'Saved!'
              : 'Save'
          }/>
        <Link 
          href="/">
            <a>Back</a>
        </Link>
        <button 
          onClick={onDelete}>
          Delete
        </button>
      </div>
    </section>
  )
}