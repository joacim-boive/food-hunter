import ShoppingList from "@/components/ShoppingList";

export default function ShoppingListPage() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Shopping List</h1>
      <ShoppingList />
    </div>
  );
}
