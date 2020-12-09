import { useItems, useCreateItem } from '../db/datastax'
import Form from "../components/Form";
import Link from 'next/link'

export default function Items() {
  const items = useItems()
  const [addItem, addInfo] = useCreateItem()

  return (
    <section>
      {items.isLoading ? 
        <small>🕒</small> : (
          <>
            <h3>ITEMS</h3> 
              {items.isFetching ? 
                <small>🕒</small> : null}
                {items.data?.length ? 
                  <ul>
                    {items.data.map((item) => 
                      <Link 
                        href={`/${item.id}`} 
                        key={item.id}>
                        <a><li>
                          {item.name}
                        </li></a>
                      </Link>
                    )}
                  </ul> : 
                  <span>Add an item</span>
                }
            <Form 
              onSubmit={addItem} 
              clearOnSubmit
              submitText={
                addInfo.isLoading
                  ? 'Adding...'
                  : addInfo.isError
                  ? 'Error!'
                  : addInfo.isSuccess
                  ? 'Added!'
                  : 'Add Item'
              }/>
          </>
        )
      }
    </section>
  )
}