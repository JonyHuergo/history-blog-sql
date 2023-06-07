import Image from "next/image";

const Author= ({ author }) => {
    return (
        <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-neutral-dark bg-opacity-60">
            <div className="absolute left-0 right-2 -top-14">
                <Image
                    unoptimized
                    src={author.photo.url}
                    alt={author.name}
                    width={100}
                    height={100}
                    className="rounded-full m-auto"
                />
            </div>
            <h3 className="text-neutral-light mt-y text-xl font-bold">{author.name}</h3>
            <p className="text-neutral-light text-lg">{author.bio}</p>
        </div>
    );
}
 
export default Author