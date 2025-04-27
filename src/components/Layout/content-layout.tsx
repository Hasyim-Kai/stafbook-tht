import { cn } from '@/utils/helper/style-merger';
import ErrorCard from '../Card/error-card';
import Loading from '../Loader/loading';

type Props = {
  showInCard?: boolean;
  loading?: boolean;
  fetching?: boolean;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  topRight?: React.ReactNode;
  error?: string | string[];
}

const ContentLayout: React.FC<Props> = ({
  showInCard = true,
  title, subtitle, children, className, topRight,
  error, loading, fetching,

}) => {


  return <section className={cn(`relative`,
    showInCard ? 'p-8 bg-white rounded-lg shadow dark:border-strokedark dark:bg-boxdark' : ''
    , className)}>
    {loading ? <Loading className='text-green-500 h-[28rem]' />
      : <>
        <div className='flex justify-between items-center mb-7'>
          <div>
            {title && <h1 className='text-4xl font-semibold text-black dark:text-white'>{title}</h1>}
            {subtitle && <p className='mt-1'>{subtitle}</p>}
          </div>
          {topRight && topRight}
        </div>
        {error && <ErrorCard className='mb-5' msg={error} />}
        {children}
      </>}
    {fetching && <Loading className='text-green-500 fixed bottom-5 right-5 w-fit h-fit p-3 rounded-lg shadow-lg bg-gray-300 dark:bg-gray-900' />}
  </section>
};

export default ContentLayout;
