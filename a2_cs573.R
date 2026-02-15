penglings<-read.csv("penglings.csv")

ggplot(data=penglings,aes(x=flipper_length_mm,y=body_mass_g,
                          color=species,size=bill_length_mm))+
  geom_point(alpha=0.65)+
  scale_color_brewer(palette="Dark2")+
  scale_size(range=c(2,8),breaks=c(35,40,45,55,60),
             limits=range(penglings$bill_length_mm,na.rm=TRUE))+
  labs(title="Penguins",
       subtitle="Those Wicked Cute Nonflying Birds",
       x="Flipper Length (mm)",y="Body Mass (g)",color="Species",
       size="Bill Length (mm)")
