import { notFound } from "next/navigation";

export default async function PostDetail({params}) {
    const supabase = createClient();

   const {data, error } = await supabase
   .from('posts')
   .select()
   .eq('id', params.id)
   .single();

   if (!data){
         console.log(error);
         return notFound();}
   
    return (
        <div>
            <h1>Post Title</h1>
            <h2>{data.title}</h2>
        </div>
    )
}