import { toast } from "sonner";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const toastVariants = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-700/30",
    animate: "animate-pulse",
  },
  error: {
    icon: AlertCircle,
    iconColor: "text-red-500",
    borderColor: "border-red-700/30",
    animate: "animate-shake",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-500",
    borderColor: "border-blue-700/30",
    animate: "animate-bounce",
  },
};

export const customToast = (message: string, type: keyof typeof toastVariants = "success" , duration : number = 2000) => {
  const variant = toastVariants[type];

  toast.custom(
    (t) => (
      <div
        className={`
        flex items-center w-full  p-4 
        bg-zinc-900 ${variant.borderColor}
        border rounded-lg shadow-2xl 
        animate-in slide-in-from-right
      `}
      >
        <div className='flex items-center space-x-3 gap-4'>
          <variant.icon className={`size-6 ${variant.iconColor} ${variant.animate}`} strokeWidth={2} />
          <div>
            <p className='text-zinc-100 font-medium text-sm'>{message}</p>
            <p className='text-zinc-400 text-xs'>{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
        <button
          onClick={() => toast.dismiss(t)}
          className='
          ml-auto text-zinc-400 hover:text-emerald-400 
          transition-colors focus:outline-none
        '
        >
          <X className='mx-4 size-4' />
        </button>
      </div>
    ),
    {
      duration: duration,
      position: "bottom-right",
      classNames: {
        toast: "bg-transparent",
        title: "text-zinc-100",
        description: "text-zinc-400",
      },
    }
  );
};
