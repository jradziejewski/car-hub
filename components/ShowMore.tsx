'use client';
import { useRouter } from 'next/navigation';
import { ShowMoreProps } from '../types';
import { CustomButton } from '.';
import { updateSearchParams } from '../utils';

function ShowMore({ pageNumber, isNext }: ShowMoreProps) {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathname = updateSearchParams('limit', newLimit.toString());

    router.push(newPathname, { scroll: false });
  };

  return (
    <div className=" w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
}

export default ShowMore;
