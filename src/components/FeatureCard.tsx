
import { LucideIcon } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => {
  return (
    <ScrollAnimation delay={delay}>
      <div className="group p-6 border border-border/50 rounded-xl bg-white hover:shadow-material transition-all duration-300">
        <div className="h-12 w-12 rounded-full bg-brand-sage/30 flex items-center justify-center mb-4 group-hover:bg-brand-sage/50 transition-colors">
          <Icon className="h-6 w-6 text-brand-sage" />
        </div>
        <h3 className="font-serif text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </ScrollAnimation>
  );
};

export default FeatureCard;
