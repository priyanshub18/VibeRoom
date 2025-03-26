import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  bgColor?: string;
  iconColor?: string;
};

const StatsCard = ({ bgColor = "bg-blue-500/20", icon: Icon, iconColor = "text-blue-500", label, value }: StatsCardProps) => {
  return (
    <Card className='w-full bg-zinc-900 border-zinc-800 hover:bg-zinc-800/90 transition-all duration-300 ease-in-out shadow-lg'>
      <CardContent className='p-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className={`p-3 rounded-xl ${bgColor} flex items-center justify-center`}>
              <Icon className={`size-6 ${iconColor}`} />
            </div>
            <div>
              <p className='text-md font-bold text-zinc-400 mb-1'>{label}</p>
              <p className='text-2xl font-bold text-white'>{value}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
