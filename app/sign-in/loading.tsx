import * as Skeleton from "../../src/components/Skeleton"

export default function Loading() {
  return (
    <Skeleton.Root>
      <Skeleton.FullLine/>
      <Skeleton.MediumLine/>
      <Skeleton.ShortLine/>
    </Skeleton.Root>
  )
}