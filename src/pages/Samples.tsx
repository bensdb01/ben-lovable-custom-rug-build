
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Package, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const materialCategories = [
  { id: "jute", name: "Jute", description: "Soft, durable, and versatile natural fiber" },
  { id: "sisal", name: "Sisal", description: "Strong, resilient fiber in 15 different colors and weaves" },
  { id: "seagrass", name: "Seagrass", description: "Hardwearing, stain-resistant natural fiber" },
  { id: "coir", name: "Coir", description: "Tough, moisture-resistant coconut fiber" },
  { id: "wool", name: "Wool", description: "Soft, insulating, and naturally flame-retardant" },
  { id: "sisool", name: "Sisool", description: "A blend of sisal and wool, combining durability with softness" }
];

const Samples = () => {
  const [selectedMaterials, setSelectedMaterials] = React.useState<Record<string, boolean>>({});
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    notes: ""
  });

  const handleSelectMaterial = (id: string) => {
    setSelectedMaterials({
      ...selectedMaterials,
      [id]: !selectedMaterials[id]
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCount = Object.values(selectedMaterials).filter(Boolean).length;
    if (selectedCount === 0) {
      toast.error("Please select at least one material sample");
      return;
    }
    
    toast.success("Your sample request has been submitted");
    
    // Reset form
    setSelectedMaterials({});
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postcode: "",
      notes: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <ScrollAnimation>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="mb-4 inline-flex">
                <span className="bg-brand-sage/20 text-brand-sage px-3 py-1 rounded-full text-xs font-medium tracking-wider">
                  FREE SAMPLES
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif mb-4">Request Material Samples</h1>
              <p className="text-muted-foreground">
                Not sure which material is right for you? Order free samples to see and feel the quality in your home before making a decision.
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-2 gap-10">
            <ScrollAnimation delay={100}>
              <div className="bg-white rounded-xl p-6 md:p-8 border border-border/50">
                <h2 className="font-serif text-xl mb-6">Select Materials</h2>
                
                <div className="space-y-4">
                  {materialCategories.map((material) => (
                    <div 
                      key={material.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedMaterials[material.id] ? 'border-brand-sage bg-brand-sage/5' : 'border-border/50'
                      }`}
                      onClick={() => handleSelectMaterial(material.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          checked={!!selectedMaterials[material.id]} 
                          onCheckedChange={() => handleSelectMaterial(material.id)}
                          className="mt-1"
                        />
                        <div>
                          <h3 className="font-medium">{material.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{material.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-brand-sage" />
                    <span>Sample size: 10 × 10 cm</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-brand-sage" />
                    <span>Free delivery within 3-5 working days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <RotateCcw className="h-4 w-4 text-brand-sage" />
                    <span>No need to return</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <div className="bg-white rounded-xl p-6 md:p-8 border border-border/50">
                <h2 className="font-serif text-xl mb-6">Delivery Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">Address</label>
                    <Input 
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium">City</label>
                      <Input 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="postcode" className="text-sm font-medium">Postcode</label>
                      <Input 
                        id="postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        placeholder="Enter your postcode"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">Additional Notes (optional)</label>
                    <Textarea 
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any specific requirements or questions?"
                      rows={3}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full mt-6 bg-brand-sage hover:bg-brand-sage/90">
                    Request Samples
                  </Button>
                </form>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Samples;
